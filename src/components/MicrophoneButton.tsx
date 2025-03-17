// src/components/MicrophoneButton.tsx
import React from 'react';
import { Button } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

interface MicrophoneButtonProps {
  isRecording: boolean;
  onClick: () => void;
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ isRecording, onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      startIcon={isRecording ? <StopIcon /> : <MicIcon />}
    >
      {isRecording ? 'Stop Recording' : 'Start Recording'}
    </Button>
  );
};

export default MicrophoneButton;
