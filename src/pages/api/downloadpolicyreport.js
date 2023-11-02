import fetch from 'node-fetch';
import fs from 'fs';
import getConfig from 'next/config';
import path from 'path';
const { publicRuntimeConfig } = getConfig();

export default async (req, res) => {
  try {
    // Make the request to the external service to get the PDF data
    const response = await fetch(`${process.env.BASE_API_URL}/api/Services/DownloadPolicyReport?TransactionId=${req.body.transactionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const publicFolderPath = publicRuntimeConfig.publicFolder || '/public';
      const tempFilePath = path.join(process.cwd(), publicFolderPath, 'tmp/test.pdf');
      // Create a write stream for the PDF file
      const fileStream = fs.createWriteStream(tempFilePath);

      // Pipe the response data into the file stream
      response.body.pipe(fileStream);

      // Handle the finish event when the file writing is complete
      fileStream.on('finish', () => {
        res.status(200).json({ url: `/tmp/test.pdf` });
      });
    } else {
      console.error('Failed to fetch PDF');
      res.status(500).json({ error: 'Failed to fetch PDF' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
