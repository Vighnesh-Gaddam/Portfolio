import { ErrorState } from '@/components/ErrorState';

export default function NotFound() {
  return (
    <ErrorState 
      title="404 - Lost in Space"
      message="The page you are looking for doesn't exist or has been moved to a new galaxy."
    />
  );
}