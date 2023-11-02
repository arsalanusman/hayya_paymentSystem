export default async (req, res) => {
  try {
    // Make the request to the external service to get the PDF data
    const response = await fetch(`${process.env.BASE_API_URL}/api/Services/DownloadPolicyReport?TransactionId=169CF711-9C04-4CA6-AE79-F2D34B42006E`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    res.status(200).json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
