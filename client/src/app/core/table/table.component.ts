import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

export interface TableColumn {
  caption: string;
  field: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  tableDataSource = new MatTableDataSource([]);
  displayedColumns!: string[];

  @Input() columns!: TableColumn[];
  @Input() set dataSource(data: any[]) {
    if (data) {
      this.setDataSource(data);
    }
  }

  async ngOnInit(): Promise<void> {
    this.displayedColumns = this.columns.map(
      (tableColumn: TableColumn) => tableColumn.caption
    );
  }

  setDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

//   onRowClicked(row: any) {
//     console.log('Row clicked: ', row);
// }
}
