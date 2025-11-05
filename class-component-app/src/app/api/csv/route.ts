import { NextRequest } from 'next/server';

const fetchCharacterDetails = async (id: number) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  if (!response.ok)
    throw new Error(`Failed to fetch details for character ${id}`);
  return response.json();
};

export async function POST(request: NextRequest) {
  const { ids } = await request.json();

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return new Response('No IDs provided', { status: 400 });
  }

  try {
    const detailsArray = await Promise.all(
      ids.map((id: number) => fetchCharacterDetails(id))
    );

    const header = [
      'Name',
      'Status',
      'Species',
      'Gender',
      'Origin',
      'Location',
      'Image',
    ];
    const rows = detailsArray.map((item) => [
      item.name,
      item.status,
      item.species,
      item.gender,
      item.origin?.name || '',
      item.location?.name || '',
      item.image,
    ]);

    const csvString = [header, ...rows]
      .map((row) =>
        row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(',')
      )
      .join('\n');

    return new Response(csvString, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${ids.length}_characters.csv"`,
      },
    });
  } catch (error) {
    console.error('Failed to generate CSV:', error);
    return new Response('Server error', { status: 500 });
  }
}