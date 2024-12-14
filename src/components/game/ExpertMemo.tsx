import React from 'react';
import './ExpertMemo.css';

interface ExpertMemoProps {
    from: string;
    subject: string;
    children: React.ReactNode;
    isAlert?: boolean;
}

export const ExpertMemo: React.FC<ExpertMemoProps> = ({ from, subject, children, isAlert = false }) => {
    const highlightColor = isAlert ? 'text-red-500' : 'text-yellow-500';
    const memoClass = isAlert ? 'expert-memo alert' : 'expert-memo';

    return (
        <div className={memoClass}>
            <div className="memo-header">
                {isAlert ? (
                    <div className="memo-label urgent animate-pulse">URGENT INPUT NEEDED</div>
                ) : (
                    <div className="memo-label standard">INTERNAL MEMORANDUM</div>
                )}
                <div className="memo-field">
                    <span className={`field-label ${highlightColor}`}>FROM:</span>
                    <span className={`field-content ${highlightColor}`}>{from}</span>
                </div>
                <div className="memo-field">
                    <span className={`field-label ${highlightColor}`}>SUBJECT:</span>
                    <span className={`field-content ${highlightColor}`}>{subject}</span>
                </div>
            </div>
            <div className="memo-body text-gray-300">
                {children}
            </div>
        </div>
    );
}; 