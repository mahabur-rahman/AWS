import { useState } from "react";
import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

export default function FetchAndUpload() {
  const [image, setImage] = useState<File | null>(null);
  const [documents, setDocuments] = useState<string[]>([]);



  const awsRegion = import.meta.env.VITE_REGION
  const bucketName = import.meta.env.VITE_BUCKET_NAME;
  const awsImgSrc = import.meta.env.VITE_IMG_SRC;
  const awsPrefix = import.meta.env.VITE_AWS_PREFIX
  const accessKey = import.meta.env.VITE_AWS_ACCESS_KEY;
  const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;


  console.log('Bucket Name:', bucketName);
console.log('Access Key:', accessKey);
console.log('Secret Access Key:', secretAccessKey);


  const s3Client = new S3Client({
    region: awsRegion,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretAccessKey,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const params = {
      Bucket:bucketName,
      Key: `${awsPrefix}/${image.name}`,
      Body: image,
      ContentType: image.type,
    };

    try {
      const data = await s3Client.send(new PutObjectCommand(params));
      console.log("File uploaded successfully:", data);
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  const handleFetch = async () => {
    const params = {
      Bucket:bucketName,
      Prefix: `${awsPrefix}/`,
    };

    try {
      const data = await s3Client.send(new ListObjectsV2Command(params));
      console.log(`Fetch data: `, data);
      if (data.Contents) {
        const documentKeys = data.Contents.map((item) => encodeURIComponent(item.Key || ""));
        setDocuments(documentKeys);
      }
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  };

  return (
    <>
      {image && <img src={URL.createObjectURL(image)} height="100" width="100" alt="Preview" />}

      <input type="file" onChange={handleChange} />
      <button onClick={handleFetch}>Fetch Documents</button>
      <button onClick={handleUpload}>Upload</button>

      <div>
        {documents.map((doc) => (
          <img 
            key={doc} 
            src={`${awsImgSrc}/${doc}`} 
            alt={doc} 
            height="100" 
            width="100" 
          />
        ))}
      </div>
    </>
  );
}
