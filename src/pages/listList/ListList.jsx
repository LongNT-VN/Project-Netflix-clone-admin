import './ListList.scss'
import { Delete } from '@material-ui/icons'
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from 'react'
import { deleteList, getLists } from '../../context/listContext/apiCall'
import {ListContext} from '../../context/listContext/ListContext'


const ListList = () => {
    const { lists, dispatch } = useContext(ListContext);
    let navigate = useNavigate();
    useEffect(() => {
        getLists(dispatch);
    }, [dispatch]);
    const handleDelete = (id) => {
        deleteList(id, dispatch);
    }
    const handleGet = (listinfo, id) => {
        navigate("/list/" + id, { state: { list: listinfo } })
    }
    return (
        <div className="list">
            <Link to="/list/new" className="link">
                <div className="Create">New list</div>
            </Link>
            <table className="listTable">
                <tr className="listTr">
                    <th className="listTH">ID</th>
                    <th className="listTH listColumn">Title</th>
                    <th className="listTH">Genre</th>
                    <th className="listTH">Number of Movies</th>
                    <th className="listTH">Action</th>
                </tr>
                {lists.map((list, index) => {
                    return <>
                        <tr className="listTr rowdata">
                            <td className="listTd">
                                <span>{index + 1}</span>
                            </td>
                            <td className="listTd listName">
                                <span className="listName">{list.title}</span>
                            </td>
                            <td className="listTd">
                                <span>{list.genre}</span>
                            </td>
                            <td className="listTd">
                                <span>{list.content.length}</span>
                            </td>
                            <td className="listTd">
                                <span className="editButton" onClick={() => handleGet(list, list._id)}>Edit</span>
                                <div className="remove" onClick={() => handleDelete(list._id)}>
                                    <Delete className="icon" />
                                </div>
                            </td>
                        </tr>
                    </>
                })}
            </table>
        </div>
    )
}

export default ListList
