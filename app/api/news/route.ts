
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  
  const apiKey = process.env.NEWS_API_KEY;
  
  let url;
  if (category === 'all' || !category) {
    // For "all" category, fetch top headlines in technology
    url = `https://newsapi.org/v2/top-headlines?category=technology&apiKey=${apiKey}`;
  } else {
    // For specific categories, search for that term
    url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apiKey}`;
  }
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}