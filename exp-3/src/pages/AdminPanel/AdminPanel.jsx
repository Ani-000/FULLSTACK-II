import "./AdminPanel.css";

function AdminPanel() {

    const users = [

        {
            id:1,
            username:"admin",
            role:"Admin",
            status:"Active"
        },

        {
            id:2,
            username:"editor",
            role:"Editor",
            status:"Active"
        },

        {
            id:3,
            username:"viewer",
            role:"Viewer",
            status:"Active"
        }

    ];

    return (

        <div className="admin-container">

            <div className="admin-header">

                <h1> Admin Control Panel</h1>

                <p>User Management</p>

            </div>

            <div className="action-buttons">

                <button>Add User</button>

                <button>Manage Roles</button>

                <button>Delete User</button>

            </div>

            <div className="table-container">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Username</th>

                            <th>Role</th>

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map(user => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>{user.username}</td>

                                <td>

                                    <span
                                        className={`role ${user.role.toLowerCase()}`}
                                    >

                                        {user.role}

                                    </span>

                                </td>

                                <td>

                                    🟢 {user.status}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminPanel;