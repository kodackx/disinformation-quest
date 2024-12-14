interface LoadingOverlayProps {
  message: string;
  progress: number;
}

export const LoadingOverlay = ({ message, progress }: LoadingOverlayProps) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div className="max-w-md w-full space-y-4 p-6">
      <div className="space-y-2">
        <p className="text-yellow-500 font-mono text-lg text-center">{message}</p>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  </div>
); 