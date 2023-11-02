export default async (req, res) => {
  try {
    // Make the request to the external service to get the PDF data
    const response = await fetch(`${process.env.BASE_API_URL}/api/Services/DownloadPolicyReport?TransactionId=${req.body.transactionId}`, {
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
