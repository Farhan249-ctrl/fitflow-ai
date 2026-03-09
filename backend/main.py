from fastapi import FastAPI, UploadFile, File

app = FastAPI()


@app.get("/")
def root():
    return {"message": "FitFlow AI backend running"}


@app.post("/analyze-food")
async def analyze_food(file: UploadFile = File(...)):
    return {
        "food": "Rice & Chicken",
        "calories": 520,
        "protein": "35g",
        "carbs": "60g",
        "fat": "12g"
    }