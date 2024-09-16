import { useState } from "react";
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  S3ClientConfig,
} from "@aws-sdk/client-s3";

interface Document {
  imgUrl: string;
  key: string;
}

export default function FetchAndUpload() {
  const [image, setImage] = useState<File | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);

  const awsRegion = import.meta.env.VITE_REGION;
  const bucketName = import.meta.env.VITE_BUCKET_NAME;
  const awsImgSrc = import.meta.env.VITE_IMG_SRC;
  const awsPrefix = import.meta.env.VITE_AWS_PREFIX;
  const accessKey = import.meta.env.VITE_AWS_ACCESS_KEY;
  const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

  const s3ClientConfig: S3ClientConfig = {
    region: awsRegion,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretAccessKey,
    },
  };

  const s3Client = new S3Client(s3ClientConfig);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const params = {
      Bucket: bucketName,
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
      Bucket: bucketName,
      Prefix: `${awsPrefix}/`,
    };

    try {
      const data: ListObjectsV2CommandOutput = await s3Client.send(new ListObjectsV2Command(params));
      console.log(`Fetch data: `, data);

      if (data.Contents) {
        const documentUrls: Document[] = data.Contents.map((item) => ({
          imgUrl: `${awsImgSrc}/${item.Key}`,
          key: item.Key || "",
        }));
        setDocuments(documentUrls);
      }
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  };

  return (
    <>
      {image && (
        <img
          src={URL.createObjectURL(image)}
          height="100"
          width="100"
          alt="Preview"
        />
      )}

      <input type="file" onChange={handleChange} />
      <button onClick={handleFetch}>Fetch Documents</button>
      <button onClick={handleUpload}>Upload</button>

      <div>
        {documents.map((doc) => (
          <div key={doc.key}>
            <img
              src={doc.imgUrl}
              alt={doc.key}
              height="100"
              width="100"
            />
            <p>imgUrl: {doc.imgUrl}</p>
          </div>
        ))}
      </div>
    </>
  );
}
