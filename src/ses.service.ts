import { BadRequestException, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';

@Injectable()
export class SESService {
  private AWS_SES_REGION = process.env.AWS_SES_REGION || 'us-east-1';
  private AWS_SES_SENDER =
    process.env.AWS_SES_SENDER || 'intersectionsys@gmail.com';

  ses = new AWS.SES({
    region: this.AWS_SES_REGION,
    accessKeyId: process.env.AWS_SES_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SES_KEY_SECRET,
  });

  async sendEmail({
    destination,
    subject,
    body,
  }: {
    destination: string;
    subject: string;
    body: string;
  }) {
    const params: SendEmailRequest = {
      Source: this.AWS_SES_SENDER,
      Destination: {
        ToAddresses: [destination], // DESTINATION
      },
      Message: {
        Body: {
          Html: {
            Data: body, // HTML
          },
        },
        Subject: {
          Data: subject, // EMAIL SUBJECT
        },
      },
    };

    try {
      const response = await this.ses.sendEmail(params).promise();
      console.log(response);
      return {
        status: 200,
        email: 'sent successfully!',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
