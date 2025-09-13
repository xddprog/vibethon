import time
from typing import Annotated
from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import APIRouter
from fastapi import Depends

from backend.api.dependency.providers.request import get_current_user_dependency
from backend.core import services
from backend.core.dto.dashboard import DashboardModel
from backend.core.dto.user_dto import BaseUserModel


router = APIRouter()


@router.get('/dashboard')
@inject
async def get_dashboard(
    dashboard_service: FromDishka[services.DashboardService],
    current_user: Annotated[BaseUserModel, Depends(get_current_user_dependency)],
) -> DashboardModel:
    return await dashboard_service.get_dashboard(current_user, time.time())


# @router.get('/stats')
# @inject
# async def get_user_stats(
#     dashboard_service: FromDishka[services.DashboardService],
#     current_user: Annotated[BaseUserModel, Depends(get_current_user_dependency)],
#     analytic_service: FromDishka[services.AnalyticsService],
# ) -> ...:
#     return await ...