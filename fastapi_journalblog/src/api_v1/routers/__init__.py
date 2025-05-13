from fastapi import APIRouter

from src.api_v1.routers.user_router import router as user_router
from src.api_v1.routers.tag_router import router as tag_router
from src.api_v1.routers.category_router import router as category_router
from src.api_v1.routers.article_router import router as article_router
from src.demo_auth.demo_jwt_auth import router as auth_jwt_router

router = APIRouter(
    prefix="/api/v1",
)

router.include_router(user_router)
router.include_router(tag_router)
router.include_router(category_router)
router.include_router(article_router)
router.include_router(auth_jwt_router)
