import React from 'react';

const DeleteTask = ({ taskId, onYes, onNo }) => {

  const handleYesBtn = () => {
    onYes(taskId); // Pass the taskId to the parent function
  };

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center z-50">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/50"></div>
      {/* Modal Content */}
      <div 
        className="relative bg-blue-100 p-6 rounded-lg shadow-xl z-60">
        <p 
          className="font-bold mb-6 text-lg">Are you sure you want to delete this task?
        </p>
        {/* Action buttons */}
        <div className="flex justify-center items-center gap-6">
          <button
            id="yes-btn"
            className="shadow-md shadow-green-300 rounded bg-green-500 min-w-fit p-3 hover:bg-green-400 font-bold transition hover:cursor-pointer"
            onClick={handleYesBtn}
          >
            Yes
          </button>
          <button
            id="no-btn"
            className="shadow-md shadow-blue-300 rounded bg-red-500 min-w-fit p-3 hover:bg-red-400 font-bold transition hover:cursor-pointer"
            onClick={onNo}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
