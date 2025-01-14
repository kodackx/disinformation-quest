import { motion, AnimatePresence } from "framer-motion";

interface LoadingOverlayProps {
  message: string;
  progress: number;
}

export const LoadingOverlay = ({ message, progress }: LoadingOverlayProps) => (
  <AnimatePresence>
    <motion.div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[45]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md w-full space-y-4 p-6">
        <div className="space-y-2">
          <p className="text-yellow-500 font-mono text-lg text-center">{message}</p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div 
              className="bg-yellow-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  </AnimatePresence>
); 