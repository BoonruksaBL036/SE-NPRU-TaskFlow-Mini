import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

const TaskCard = ({ task, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    Swal.fire({
      title: 'ลบงานนี้หรือไม่?',
      text: "คุณจะไม่สามารถกู้คืนงานนี้ได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f1416c',
      cancelButtonColor: '#7e8299',
      confirmButtonText: 'ลบเลย!',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(task._id);
        Swal.fire('Deleted!', 'งานของคุณถูกลบแล้ว', 'success');
      }
    });
  };

  return (
    <div className="task-card-modern">
      <div className="tcm-header">
        <h3 className="tcm-title">{task.title}</h3>
        <div className="tcm-actions">
          <button className="tcm-btn" onClick={() => navigate(`/tasks/${task._id}`)}>
            <Edit2 size={14} /> Edit
          </button>
          <button className="tcm-btn" onClick={handleDelete}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
      
      <p className="tcm-desc">{task.description || 'ไม่มีรายละเอียด'}</p>
      
      <div className="tcm-badges">
        <span className={`tcm-badge badge-status-${task.status.replace('_', '-')}`}>
          {task.status.replace('_', '-').toUpperCase()}
        </span>
        <span className={`tcm-badge badge-priority-${task.priority}`}>
          PRIORITY: {task.priority.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
