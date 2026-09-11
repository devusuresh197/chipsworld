import os
import shutil
import uuid
import io
import random
import torch
import cv2
import numpy as np
from PIL import Image
from contextlib import asynccontextmanager

from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Import Hugging Face Transformers classes for Grounding DINO zero-shot object detection
from transformers import AutoProcessor, AutoModelForZeroShotObjectDetection

# Global dictionary to store the AI model and processor so they are loaded ONCE
ml_models = {}

MODEL_ID = "IDEA-Research/grounding-dino-base"

# ==============================================================================
# DATASETS FOR GENERATING UNIQUE FUNNY CHIP DEMOGRAPHIC PROFILES
# ==============================================================================
FUNNY_NAMES = [
    "Nacho Nathan", "Crispy Chris", "Salty Sam", "Dorito Dave", "Cheesy Chloe",
    "Tostito Tom", "Pringle Paula", "Barbecue Bob", "Crunchy Cathy", "Paprika Pete",
    "Jalapeño Jack", "Saltine Sally", "Taco Tony", "Chippy Charlie", "Salsa Sarah",
    "Guac Gary", "Tortilla Tina", "Ruffle Rachelle", "Dip Dylan", "Kettle Kevin"
]

FUNNY_USERNAMES = [
    "@nachonathan", "@crispychris", "@saltysam", "@doritodave", "@cheesychloe",
    "@tostitotom", "@pringlepaula", "@barbecuebob", "@crunchycathy", "@paprikapete",
    "@jalapenojack", "@saltinesally", "@tacotony", "@chippycharlie", "@salsasarah",
    "@guacgary", "@tortillatina", "@rufflerachelle", "@dipdylan", "@kettlekevin"
]

PERSONALITIES = [
    "Introvert", "Chaotic Neutral", "Dramatic Queen", "Sleepyhead", "Spicy & Bold",
    "Over-salted Overthinker", "Salty Rebel", "Super Extrovert", "Smooth Operator",
    "Chill Vibe Enthusiast", "Unapologetically Crunchy", "Salsa Addict"
]

FAVORITE_FLAVORS = [
    "Classic Salted", "Sour Cream & Onion", "Flamin' Hot Chili", "Smokey Barbecue",
    "Zesty Lime", "Cheddar Cheese", "Salt & Vinegar", "Sweet Onion", "Nacho Cheese",
    "Black Pepper & Sea Salt"
]

MOODS = [
    "Crispy & Happy 🌟", "Feeling Salty 🧂", "Crunching Hard 💪", "Floating in Salsa 💃",
    "A Bit Crumbled 🥺", "Ready to Dip 🥑", "Super Crunchy 🔥", "Vibing in the Bowl 🥣"
]

BIOS = [
    "Living life one dip at a time.",
    "Too salty for your drama.",
    "Certified crunch enthusiast since day one.",
    "Looking for my soulmate in a guacamole bowl.",
    "Never crumbles under pressure.",
    "100% baked with good vibes.",
    "Stay crispy, stay humble.",
    "Professional couch potato partner.",
    "Dangerously cheesy and unbothered."
]

JOB_TITLES = [
    "Chief Crunch Officer", "Lead Guac Dip Tester", "Senior Salt Specialist",
    "Crispiness Engineer", "Snack Bag Architect", "Salsa Strategist",
    "Deep Fryer Operator", "Flavor Chemist", "Crumble Risk Analyst",
    "Bag Inflation Scientist", "Head of Crunch Operations", "Dip Logistics Lead"
]

COMPANIES = [
    "Doritos Corp", "Lay's Labs", "Pringles Inc", "Kettle Brands United",
    "Cheetos Dynamics", "Tostitos Global", "Ruffles Enterprises", "Cape Cod Snacks",
    "Utz Industries", "Takis Tech"
]

RELATIONSHIP_STATUSES = [
    "Single & Crispy 💔", "In a Relationship with Dip 🥑", "It's Complicated with Salsa 💃",
    "Married to Guac 💍", "Engaged to Cheese Dip 🧀", "Looking for a Dip Partner 🥣",
    "Crushed & Heartbroken 🩹", "Happily Baked Together ☀️"
]

ACHIEVEMENT_BADGES = [
    "🏆 100% Unbroken", "🥑 Guac Master", "🔥 Flamin' Hot Survivor", "🧂 Perfectly Salted",
    "👑 Bowl Champion", "💪 Double Dipper", "✨ Extra Crunchy", "🥇 Top Snack of 2026",
    "🛡️ Deep Bowl Shield", "⚡ Fast Cruncher"
]

def generate_chip_profile(index: int, box: list, score: float, personality: str = None):
    """Generates a unique funny demographic profile for a detected potato chip."""
    name = random.choice(FUNNY_NAMES)
    username = f"@{name.lower().replace(' ', '').replace('ñ', 'n')}_{random.randint(10, 99)}"
    if not personality:
        personality = random.choice(PERSONALITIES)
    flavor = random.choice(FAVORITE_FLAVORS)
    mood = random.choice(MOODS)
    bio = random.choice(BIOS)
    age = random.randint(1, 99)
    job_title = random.choice(JOB_TITLES)
    company = random.choice(COMPANIES)
    relationship_status = random.choice(RELATIONSHIP_STATUSES)
    achievement_badges = random.sample(ACHIEVEMENT_BADGES, k=random.randint(1, 3))
    followers_count = random.randint(1200, 950000)
    following_count = random.randint(50, 3200)

    return {
        "id": f"Chip-{index:03d}",
        "name": name,
        "username": username,
        "age": age,
        "personality": personality,
        "favorite_flavor": flavor,
        "mood": mood,
        "bio": bio,
        "job_title": job_title,
        "company": company,
        "relationship_status": relationship_status,
        "achievement_badges": achievement_badges,
        "followers_count": followers_count,
        "following_count": following_count,
        "score": score,
        "bbox": box
    }

# ==============================================================================
# 1. LIFESPAN EVENT MANAGER (Loads AI Model ONCE when FastAPI starts up)
# ==============================================================================
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    FastAPI Lifespan Context Manager.
    Loads the AI model and processor on startup and keeps them ready in memory.
    """
    print(f"🚀 Loading Grounding DINO model '{MODEL_ID}' from Hugging Face...")
    try:
        ml_models["processor"] = AutoProcessor.from_pretrained(MODEL_ID)
        ml_models["model"] = AutoModelForZeroShotObjectDetection.from_pretrained(MODEL_ID)
        ml_models["model"].eval()
        print("✅ Grounding DINO model loaded successfully and ready for inference!")
    except Exception as e:
        print(f"❌ Error loading Grounding DINO model: {e}")
        ml_models["processor"] = None
        ml_models["model"] = None

    yield
    print("🧹 Cleaning up machine learning model resources...")
    ml_models.clear()

# Initialize FastAPI application
app = FastAPI(
    title="Chip Population Counter API",
    description="FastAPI Backend for Chip Population Counting using Grounding DINO",
    version="1.3.0",
    lifespan=lifespan
)

# Enable CORS for Next.js frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure 'uploads' and 'results' directories exist
BASE_DIR = os.path.dirname(__file__)
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
RESULTS_DIR = os.path.join(BASE_DIR, "results")

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULTS_DIR, exist_ok=True)

# Mount static files endpoints
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
app.mount("/results", StaticFiles(directory=RESULTS_DIR), name="results")

# ==============================================================================
# 2. HEALTH & ROOT ENDPOINTS
# ==============================================================================
@app.get("/")
def read_root():
    model_status = "loaded" if ml_models.get("model") is not None else "not_loaded"
    return {
        "status": "online",
        "service": "Chip Population Counter API",
        "model": MODEL_ID,
        "model_status": model_status
    }

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

# ==============================================================================
# 3. CHIP COUNTING & PROFILE GENERATION ENDPOINT
# ==============================================================================
@app.post("/count")
async def count_chips(
    file: UploadFile = File(..., description="Uploaded chip photo image file (PNG, JPG, WEBP)"),
    box_threshold: float = Form(0.25, description="Confidence threshold for bounding boxes (0.1 - 1.0)"),
    text_threshold: float = Form(0.25, description="Text matching threshold (0.1 - 1.0)")
):
    """
    Accepts an uploaded image file, processes it through Grounding DINO zero-shot detection
    with prompt 'potato chip.', extracts bounding box geometry and crop image characteristics,
    assigns visual personalities (King of the Bowl, Tiny Terror, Drama Queen, Edgy Villain, Happy Chip),
    draws green bounding boxes using OpenCV, saves the annotated image to results/,
    and returns the chip count, chips profile array, and annotated image URL.
    """
    processor = ml_models.get("processor")
    model = ml_models.get("model")

    if processor is None or model is None:
        raise HTTPException(
            status_code=503,
            detail="Grounding DINO model is not initialized yet. Please check server startup logs."
        )

    # Validate image file type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be a valid image.")

    # Read uploaded file bytes and open as PIL RGB Image
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image file: {str(e)}")

    # Save raw uploaded image to uploads/ folder
    file_extension = os.path.splitext(file.filename)[1] if file.filename else ".jpg"
    unique_id = uuid.uuid4().hex
    saved_filename = f"{unique_id}{file_extension}"
    saved_filepath = os.path.join(UPLOAD_DIR, saved_filename)
    
    with open(saved_filepath, "wb") as f:
        f.write(contents)

    # Grounding DINO text prompt (requires trailing period '.')
    text_prompt = "potato chip."

    # Preprocess image and text prompt into PyTorch Tensors
    inputs = processor(images=image, text=text_prompt, return_tensors="pt")

    # Run forward pass through Grounding DINO neural network
    with torch.no_grad():
        outputs = model(**inputs)

    # Post-process bounding boxes with threshold & text_threshold
    height, width = image.height, image.width
    results = processor.post_process_grounded_object_detection(
        outputs,
        inputs.input_ids,
        threshold=box_threshold,
        text_threshold=text_threshold,
        target_sizes=[(height, width)]
    )[0]

    # Extract detection boxes, scores, and labels
    boxes_tensor = results["boxes"]
    scores_tensor = results["scores"]
    labels = results["labels"]

    boxes_list = [[round(coord, 2) for coord in box.tolist()] for box in boxes_tensor]
    scores_list = [round(score.item(), 4) for score in scores_tensor]
    total_count = len(boxes_list)

    # Convert PIL Image (RGB) to OpenCV Image (BGR) for crop analysis and annotation
    cv_img = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    # --------------------------------------------------------------------------
    # VISUAL BOUNDING BOX & CROP METRICS ANALYSIS FOR PERSONALITY DERIVATION
    # --------------------------------------------------------------------------
    assigned_personalities = {}
    if total_count > 0:
        metrics = []
        for idx, box in enumerate(boxes_list):
            x1, y1, x2, y2 = int(box[0]), int(box[1]), int(box[2]), int(box[3])
            # Clamp coordinates to valid image dimensions
            x1_c, y1_c = max(0, x1), max(0, y1)
            x2_c, y2_c = min(cv_img.shape[1], x2), min(cv_img.shape[0], y2)

            w = max(1, x2_c - x1_c)
            h = max(1, y2_c - y1_c)
            area = w * h
            aspect_diff = abs((w / float(h)) - 1.0)
            aspect_distortion = max(w / float(h), h / float(w))

            crop = cv_img[y1_c:y2_c, x1_c:x2_c]
            if crop.size > 0:
                gray_crop = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
                brightness = float(np.mean(gray_crop))
            else:
                brightness = 128.0

            metrics.append({
                "idx": idx,
                "area": area,
                "aspect_diff": aspect_diff,
                "aspect_distortion": aspect_distortion,
                "brightness": brightness
            })

        # 1. Biggest chip -> King of the Bowl 👑
        king_chip = max(metrics, key=lambda x: x["area"])
        assigned_personalities[king_chip["idx"]] = "King of the Bowl 👑"

        # 2. Smallest chip -> Tiny Terror 😈
        smallest_candidates = [m for m in metrics if m["idx"] not in assigned_personalities]
        if smallest_candidates:
            tiny_chip = min(smallest_candidates, key=lambda x: x["area"])
            assigned_personalities[tiny_chip["idx"]] = "Tiny Terror 😈"

        # 3. Dark-colored chip -> Edgy Villain 🖤
        dark_candidates = [m for m in metrics if m["idx"] not in assigned_personalities]
        if dark_candidates:
            dark_chip = min(dark_candidates, key=lambda x: x["brightness"])
            assigned_personalities[dark_chip["idx"]] = "Edgy Villain 🖤"

        # 4. Round chip -> Happy Chip 😊
        round_candidates = [m for m in metrics if m["idx"] not in assigned_personalities]
        if round_candidates:
            round_chip = min(round_candidates, key=lambda x: x["aspect_diff"])
            assigned_personalities[round_chip["idx"]] = "Happy Chip 😊"

        # 5. Broken chip -> Drama Queen 🎭
        broken_candidates = [m for m in metrics if m["idx"] not in assigned_personalities]
        if broken_candidates:
            broken_chip = max(broken_candidates, key=lambda x: x["aspect_distortion"])
            assigned_personalities[broken_chip["idx"]] = "Drama Queen 🎭"

    # Generate unique demographic profiles for every detected chip
    chips_profiles = [
        generate_chip_profile(idx + 1, box, score, personality=assigned_personalities.get(idx))
        for idx, (box, score) in enumerate(zip(boxes_list, scores_list))
    ]

    # --------------------------------------------------------------------------
    # OPENCV BOUNDING BOX ANNOTATION & RESULTS STORAGE
    # --------------------------------------------------------------------------
    # Draw green bounding boxes for every detected chip with ID badge
    for idx, (box, score) in enumerate(zip(boxes_list, scores_list), start=1):
        x1, y1, x2, y2 = int(box[0]), int(box[1]), int(box[2]), int(box[3])
        
        # BGR color for Green is (0, 255, 0)
        cv2.rectangle(cv_img, (x1, y1), (x2, y2), (0, 255, 0), 2)

        # Draw chip ID & score badge (e.g. "Chip-001 | 0.88")
        label_text = f"Chip-{idx:03d} | {score:.2f}"
        (text_w, text_h), _ = cv2.getTextSize(label_text, cv2.FONT_HERSHEY_SIMPLEX, 0.45, 1)
        cv2.rectangle(cv_img, (x1, y1 - text_h - 6), (x1 + text_w + 4, y1), (0, 255, 0), -1)
        cv2.putText(cv_img, label_text, (x1 + 2, y1 - 4), cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 0, 0), 1, cv2.LINE_AA)

    # Save annotated image inside 'results/' folder
    annotated_filename = f"annotated_{unique_id}.jpg"
    annotated_filepath = os.path.join(RESULTS_DIR, annotated_filename)
    cv2.imwrite(annotated_filepath, cv_img)

    annotated_image_url = f"/results/{annotated_filename}"

    # Handle zero detections case
    if total_count == 0:
        return {
            "count": 0,
            "status": "no_detections",
            "message": "No potato chips detected in the uploaded image. Try lowering box_threshold or uploading a clearer image.",
            "annotated_image_url": annotated_image_url,
            "chips": [],
            "boxes": [],
            "scores": [],
            "labels": [],
            "saved_filename": saved_filename
        }

    # Return successful count response with unique chip profiles array
    return {
        "count": total_count,
        "status": "success",
        "message": f"Successfully detected {total_count} potato chip(s).",
        "annotated_image_url": annotated_image_url,
        "chips": chips_profiles,
        "boxes": boxes_list,
        "scores": scores_list,
        "labels": labels,
        "saved_filename": saved_filename,
        "image_size": {"width": width, "height": height}
    }
