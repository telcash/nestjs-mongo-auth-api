import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hashData(data: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
  }

  async compareData(data: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(data, hash);
  }
}
