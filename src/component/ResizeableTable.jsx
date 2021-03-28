import React from 'react'
import listCSS  from "./listTable.less"
import 'antd/dist/antd.css'
import zhCN from 'antd/lib/locale/zh_CN'
import PropTypes from 'prop-types'
import { Table,ConfigProvider } from 'antd'
import { Resizable } from 'react-resizable'


class ResizeableTitle extends React.Component {
  render() {
    const { onResize, width, onClick, ...restProps } = this.props;
    return (
      <Resizable
        width={width}
        height={0}
        onResizeStart={() => (this.resizing = true)}
        onResizeStop={() => {
          setTimeout(() => {
            this.resizing = false;
          });
        }}
        onResize={onResize}
      >
        <th
          onClick={(...args) => {
            console.log(">>>", this.resizing);
            if (!this.resizing && onClick) {
              onClick(...args);
            }
          }}
          {...restProps}
        />
      </Resizable>
    );
  }
}


class ResizeableTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: props.columns
    };
  }

  components = {
    header: {
      cell: ResizeableTitle
    }
  }
  calculateColumsWidthSum = (columns = [], firstColWidth = 0, lastColWidth = 0)=> {
    const arrReducer = (accumulator, currentValue) => {
      if (!currentValue || !currentValue.width) {
        return accumulator
      }
  
      let width = currentValue.width
      if (typeof width === 'string') {
        if (width.endsWith('px')) {
          width = parseFloat(width.split('px')[0])
        } else {
          return accumulator
        }
      } else if (typeof width === 'number') {
        width = parseFloat(width)
      } else {
        return accumulator
      }
      return accumulator + width
    }
    return columns.reduce(arrReducer, 0) + firstColWidth + lastColWidth
  }

  componentDidMount() {
  }

  render() { 
    const {className,tableLayout,rowKey,components,scrollToFirstRowOnChange,locale,columns,lastColumnWidth,firstColumnWidth, ...restProps} = this.props
    const _columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: this.handleResize(index)
      })
    }))
    let tableScrollWidth = this.calculateColumsWidthSum(_columns, firstColumnWidth, lastColumnWidth)
    const _components = Object.assign({},components,this.components)
    return <ConfigProvider locale={locale || zhCN}>
        <div className={`${className} listBox`} style={{ marginTop: '15px' }}>
            <style dangerouslySetInnerHTML={{ __html: {listCSS} }} />
            <Table bordered tableLayout={tableLayout || 'fixed'} className="lat_list_tablestyle" columns={_columns} components={_components} rowKey={rowKey || 'lat_global_table'} scroll={{ x: tableScrollWidth }}  {...restProps} scrollToFirstRowOnChange={scrollToFirstRowOnChange || true}/>
        </div>
     </ConfigProvider>
  }

  handleResize = (index) => (e, { size }) => {
    e.stopImmediatePropagation();
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      };
      return { columns: nextColumns }
    })
  }
}

ResizeableTable.propTypes = {
  sticky: PropTypes.object,
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  onChange:PropTypes.func,
  firstColumnWidth:PropTypes.number,
  lastColumnWidth:PropTypes.number,
  scroll:PropTypes.object
}
ResizeableTable.defaultProps ={
  sticky:{offsetHeader:56},
  columns:[],
  dataSource:[],
  firstColumnWidth:65,
  lastColumnWidth:150
}

export default ResizeableTable
