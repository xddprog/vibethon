import asyncio
import re
import aiohttp
from typing import List, Dict

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

# from backend.infrastructure.database.models.university import University

UNIVERSITY_API_URL = "https://api.gigdata.ru/api/v2/suggest/educations"
API_KEY = "gayispt9yitlnzu9irwbbwvokd6t6jcfh6mmoybm"  # вставь токен сюда

LETTERS = [chr(c) for c in range(ord("а"), ord("я") + 1)]


def clean_whitespace(text: str) -> str:
    return re.sub(r'\s+', ' ', text).strip()


async def fetch_suggestions(session: aiohttp.ClientSession, letter: str) -> List[Dict]:
    payload = {
        "query": letter,
        "count": 2000
    }
    headers = {
        "authorization": API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    async with session.post(UNIVERSITY_API_URL, json=payload, headers=headers) as response:
        data = await response.json()
        print(data)
        return data.get("suggestions", [])
    

async def load_universities(db_session: AsyncSession):
    # check_exist = (await db_session.execute(select(University).limit(1))).scalar_one_or_none()
    # if check_exist:
    check_exist = False
    if check_exist:
        return
    
    seen_names = set()

    async with aiohttp.ClientSession() as session:
        for letter in LETTERS:
            print(letter)
            suggestions = await fetch_suggestions(session, letter)
            for item in suggestions:
                name = item.get("value")
                if name and name not in seen_names:
                    seen_names.add(name)
    print(set(clean_whitespace(name) for name in seen_names))
    # for university in set(clean_whitespace(name) for name in seen_names):
        # db_session.add(University(name=university))
    # await db_session.commit()


asyncio.run(load_universities(None))