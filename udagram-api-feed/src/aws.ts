import AWS = require('aws-sdk');
import {config} from './config/config';


// Configure AWS
const credentials = new AWS.SharedIniFileCredentials({profile: "default"});
credentials.accessKeyId = "ASIAV6H3EANILTAIECNA";
credentials.secretAccessKey = "YUeSQMLrA8ZNyl3g37gcxKQgV0qLKkKFGZNEA0rS";
credentials.sessionToken = "FwoGZXIvYXdzEIL//////////wEaDCD6s0nFOQKlWf9cNSK8AUya2933Uh2BdnLt4OQHKd9a0iPI8sYYSIqsuj1xgpHDa0VaxXyRvKYHOmMnxepH1DV4gLnNCeoTVZxN2xnLfJMoXbq6kgeOIvBeY8EGUK8fhQI9mOQuWJ2wgvg8tP/iYXZUy7Onk3vUmIYHxavQZyxvlVYfhMYbEihS3XCb8opRM11+2g9+7kvfO7IyCjWsi0KuyHmFWtbfa5zppdDlA1GEEt9A2Pf/WEOPrCVFSbQZsiJmN1KFklLacpJxKPe2yp0GMi2J2cXeHt5Rir0N7mOk2HVd4GbVKWccM82TBgEaw5qdqtWLnyNCahfwSFVpflg=";
AWS.config.credentials = credentials;

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: config.aws_region,
  params: {Bucket: config.aws_media_bucket},
});

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl('getObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;

  console.debug("key " + key);
  console.debug("aws_profile " + config.aws_profile);
  
  console.debug("config.aws_media_bucket" + config.aws_media_bucket);
  console.debug("accessKeyId " + JSON.stringify(credentials));
  console.debug("accessKeyId " + credentials.accessKeyId);
  console.debug("secretAccessKey " + credentials.secretAccessKey);
  console.debug("expireTime " + credentials.expireTime);
  console.debug("sessionToken " + credentials.sessionToken);
  
  return s3.getSignedUrl('putObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}
