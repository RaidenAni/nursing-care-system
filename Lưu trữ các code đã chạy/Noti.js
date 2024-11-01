import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Notifications = ({ patients, notifications, setNotifications }) => {
  const navigate = useNavigate();
  const [editingRoom, setEditingRoom] = useState(null);  // Phòng đang chỉnh sửa
  const [newNote, setNewNote] = useState('');  // Ghi chú mới

  // Đảm bảo rằng mọi thông báo mới đều có trạng thái "Pending" mặc định
  useEffect(() => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      status: notification.status || 'Pending', // Set trạng thái mặc định là Pending nếu chưa có
    }));
    setNotifications(updatedNotifications);
  }, [notifications, setNotifications]);

  // Hàm thay đổi trạng thái thông báo
  const handleStatusChange = (roomIndex, notificationIndex, newStatus) => {
    const updatedNotifications = [...notifications];
    const filteredNotifications = updatedNotifications.filter((n) => n.room === roomIndex + 701);

    if (filteredNotifications.length > 0) {
      filteredNotifications[notificationIndex].status = newStatus;
      setNotifications([...updatedNotifications]);
    }
  };

  // Mở modal thêm ghi chú
  const handleOpenNote = (roomIndex) => {
    setEditingRoom(roomIndex);  // Ghi nhận phòng đang chỉnh sửa
  };

  // Lưu ghi chú và cập nhật yêu cầu
  const handleSaveNote = (roomIndex) => {
    const updatedNotifications = [...notifications];
    const filteredNotifications = updatedNotifications.filter((n) => n.room === roomIndex + 701);

    const newRequest = {
      room: roomIndex + 700,
      time: new Date().toLocaleTimeString(),
      message: newNote,
      status: 'Pending',
    };

    if (filteredNotifications.length > 0) {
      // Nếu đã có thông báo, thêm ghi chú vào
      filteredNotifications[0].message = `${filteredNotifications[0].message || ''} - ${newNote}`;
    } else {
      // Nếu chưa có thông báo, tạo thông báo mới
      updatedNotifications.push(newRequest);
    }

    setNotifications(updatedNotifications);

    // Reset dữ liệu và đóng modal
    setNewNote('');
    setEditingRoom(null);
  };

  // Hàm xoá yêu cầu
  const handleDeleteRequest = (roomIndex, notificationIndex) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(notificationIndex, 1);  // Xoá yêu cầu từ mảng
    setNotifications(updatedNotifications);
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">Notifications</h1>
      <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border p-2 text-center">Room</th>
            <th className="border p-2 text-center">Patient</th>
            <th className="border p-2 text-center">Time</th>
            <th className="border p-2 text-center">Requests</th>
            <th className="border p-2 text-center">Status</th>
            <th className="border p-2 text-center">Add Note</th> {/* Cột thêm ghi chú */}
          </tr>
        </thead>
        <tbody className="bg-white">
          {patients.map((patient, roomIndex) => (
            <tr key={roomIndex} className="hover:bg-gray-100 transition-colors">
              <td className="border p-2 text-center">{700 + roomIndex}</td>
              <td className="border p-2">{patient.name || 'Chưa có tên'}</td>
              <td className="border p-2">
                {notifications
                  .filter((notification) => notification.room === 700 + roomIndex)
                  .map((notification, notificationIndex) => (
                    <div key={notificationIndex} className="mb-2 flex items-center">
                      {new Date(notification.time).toLocaleDateString('en-GB')} {new Date(notification.time).toLocaleTimeString()}
                    </div>
                  ))}
              </td>
              <td className="border p-2">
                {notifications
                  .filter((notification) => notification.room === 700 + roomIndex)
                  .map((notification, notificationIndex) => (
                    <div key={notificationIndex} className="mb-2 flex items-center">
                      {notification.message || 'No requests'}
                      <button
                        className="text-red-500 ml-2 hover:text-red-700"
                        onClick={() => handleDeleteRequest(roomIndex, notificationIndex)}  // Xóa yêu cầu
                      >
                        ❌
                      </button>
                    </div>
                  ))}
              </td>
              <td className="border p-2">
                {notifications
                  .filter((notification) => notification.room === 700 + roomIndex)
                  .map((notification, notificationIndex) => (
                    <div key={notificationIndex} className="mb-2">
                      <select
                        className="border p-1 rounded"
                        value={notification.status || 'Pending'}
                        onChange={(e) =>
                          handleStatusChange(roomIndex, notificationIndex, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                  ))}
              </td>
              <td className="border p-2 text-center">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleOpenNote(roomIndex)}
                >
                  ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal thêm ghi chú */}
      {editingRoom !== null && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add Note for Room {700 + editingRoom}</h2>
            <textarea
              className="w-full border p-2 rounded-md"
              placeholder="Enter your note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={() => handleSaveNote(editingRoom)}
              >
                Save Note
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                onClick={() => setEditingRoom(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nút quay lại Dashboard */}
      <div className="text-center mt-6">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          onClick={() => navigate('/')}
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Notifications;
