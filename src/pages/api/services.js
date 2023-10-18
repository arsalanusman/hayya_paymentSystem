export default async (req, res) => {
  try {
    let id = ''
    if(req.query.type == 'telecom'){
      id = '5046540E-0AFC-4D73-9699-69269643BF27'
    }else if(req.query.type == 'moi'){
      id = 'DD6E76F2-346A-4889-AC14-1176A673EF9C'
    }

    const response = await fetch(`https://hps-api-dev.microsysx.com/api/Services?ServiceId=${id}`);
    const data = await response.json();
    res.status(200).json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};