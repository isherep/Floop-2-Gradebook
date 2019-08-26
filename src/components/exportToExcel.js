import React, {Component} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class ExportToExcel extends Component {
    render () {
        return (
            <div style={{margin: '25px'}}>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="export"
                    filename="filteredData"
                    sheet="tablexls"
                    buttonText="Export"/>
            </div>
        )
    }

}
export default ExportToExcel;