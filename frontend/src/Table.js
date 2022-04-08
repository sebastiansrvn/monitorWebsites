import * as React from 'react';

export default function BasicTable(props) {
  return <>
    <table className='table table-bordered table-dark'>
      <thead>
        <tr>
          {props.headers.map((header, index) => {
            return index === 0 ? <th scope='col' key={index}>{header}</th> : <th scope='col' key={index}>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody style={{ borderTop: '1px' }}>
        {props.rows.map((row, index) => {
          return <tr className={row[0].color} key={index}>
            {row.map((info, lowerIndex) => {
              // Displays row info as well as the ability to click on the site name and open that specfic site.
              // All of the site info is sent to the updatePage() method. Once backend is implemented, the ID of the record will be sent.
              if (lowerIndex === 1) {
                return <td onClick={() => props.updatePage("Individual Site", row[0])} className='text-info site-name-satus' key={lowerIndex + info}>{info}</td>
              } else if (lowerIndex > 1) {
                return <td className='' key={lowerIndex + info} >{info}</td>
              }
            })}
          </tr>;
        })}
      </tbody>
    </table>
  </>
}