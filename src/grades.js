import React, {Component} from 'react';
import students from './students.json';
import ExportToExcel from './exportToExcel';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import 'react-table-hoc-fixed-columns/lib/styles.css';

class Grades extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            students: [
    
            ]
        }
        this.renderEditable = this.renderEditable.bind(this);
    }

    componentDidMount() {
        this.setState({students})
    }

    renderEditable(cellInfo) {
        return (
          <div
            suppressContentEditableWarning
            contentEditable
            onDoubleClick={e => {
              const students = [...this.state.students];
              students[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({students});
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.students[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
    }

    deleteColumn(id) {
        const index = this.state.students.findIndex(student => {
          return student.id === id
        })
        console.log("index", index)
    }

    render() {
        const ReactTableFixedColumns = withFixedColumns(ReactTable);
        const columns = [
            {
                Header: "Student ID",
                accessor: "id",
                fixed: 'left',
            },
            {
                Header: "Name",
                accessor: "name",
                fixed: 'left',
                minWidth: 200
            },
            {
                Header: "Assignment 1",
                accessor: "a1",
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 2",
                accessor: "a2",
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 3",
                accessor: "a3",
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 4",
                accessor: "a4",
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 5",
                accessor: "a5",
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 6",
                accessor: "a6",
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 7",
                accessor: "a7",
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 8",
                accessor: "a8",
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 8",
                accessor: "a8",
                Cell: this.renderEditable,
                minWidth: 150,
            },
            {
                Header: "Actions",
                Cell: props => {
                    return (
                        <button style={{
                            backgroundColor: "red",
                            color: "#fefefe"
                        }}
                            onClick={() => {
                                this.deleteColumn(props.original.id)
                        }}
                        >
                            Delete
                        </button>
                    )  
                }
            }
        ]
        return(
          <ReactTableFixedColumns
            columns={columns}
            data={this.state.students}
            showPagination={false}
            filterable
            defaultPageSize={15}
            style={{
              height: "400px",
              width: "1000px",
              "border-right": "1px black solid",
              "border-top": "1px black solid",
              "border-bottom": "1px black solid",
              "border-left": "none"
            }}
            >
            {(state, filteredData, instance) => {
              this.ReactTableFixedColumns = state.pageRows.map(student => {return student._original});
                return (
                  <div>
                    {filteredData()}
                    <ExportToExcel students={this.ReactTableFixedColumns}/> 
                  </div>
                )
    
            }}
          </ReactTableFixedColumns>
        );
    
    }
}
export default Grades;