export default async (req, res) => {
  try {
    const response = await fetch('https://hps-api-dev.microsysx.com/api/Services?ServiceId=DD6E76F2-346A-4889-AC14-1176A673EF9C');
    const data = await response.json();
    res.status(200).json(data.result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};