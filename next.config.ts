import path from 'path';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

export default nextConfig;
