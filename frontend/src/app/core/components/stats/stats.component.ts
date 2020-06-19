import { TableData } from './../../../model/tableData';
import { LocationsFacade } from './../../../storage/locations/location.facade';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['element', 'downloads'];
  downloads = [];
  dataSource: MatTableDataSource<TableData>;
  header: string;

  constructor(private locationsFacade: LocationsFacade) { }

  ngOnInit() { }

  perCountry() {
    // Show country table
    this.locationsFacade.getPerCountry().subscribe((res) => {
      if (res) {
        this.header = 'Country';
        this.downloads = [];
        for (const key of res.keys()) {
          this.downloads.push({element: key, downloads: res.get(key).length})
        }
      }
    });
    this.dataSource = new MatTableDataSource(this.downloads);
    this.dataSource.sort = this.sort;
  }

  perDayTime() {
    // Show day time table
    this.locationsFacade.getPerDayTime().subscribe((res) => {
      if (res) {
        this.header = 'Day time';
        this.downloads = [];
        for (const key of res.keys()) {
          this.downloads.push({element: key, downloads: res.get(key).length})
        }
      }
    });
    this.dataSource = new MatTableDataSource(this.downloads);
    this.dataSource.sort = this.sort;
  }

}
