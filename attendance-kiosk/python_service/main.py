# test_environment.py
from fastapi import FastAPI
import uvicorn
import cv2
import insightface
from threading import Thread
import numpy as np

# --- 🧠 TEST 1: FastAPI ---
app = FastAPI()

@app.get("/")
def root():
    return {"message": "✅ FastAPI is working!"}

def run_fastapi():
    print("🚀 Starting FastAPI test server on http://127.0.0.1:8000")
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="error")

# --- 📸 TEST 2: OpenCV ---
def test_opencv():
    print("🧩 Testing OpenCV (cv2)...")
    img = cv2.imread("/usr/share/icons/raspberry-pi.png")  # random system image (if exists)
    if img is None:
        print("⚠️ No test image found, creating dummy one...")
        img = 255 * np.ones((100, 100, 3), dtype=np.uint8)
    print(f"✅ OpenCV loaded an image of shape: {img.shape}")

# --- 🧬 TEST 3: InsightFace ---
def test_insightface():
    print("🧠 Testing InsightFace...")
    try:
        model = insightface.app.FaceAnalysis()
        model.prepare(ctx_id=0)
        print("✅ InsightFace model initialized successfully!")
    except Exception as e:
        print("❌ InsightFace error:", e)

# --- 🚀 MAIN EXECUTION ---
if __name__ == "__main__":
    print("🔍 Checking environment components...\n")

    # Run FastAPI in background
    fastapi_thread = Thread(target=run_fastapi, daemon=True)
    fastapi_thread.start()

    # Test OpenCV
    test_opencv()

    # Test InsightFace
    test_insightface()

    print("\n✅ All tests executed. Visit http://127.0.0.1:8000 to verify FastAPI.\n")
