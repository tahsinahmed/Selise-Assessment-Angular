import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DialogOverviewExampleDialog} from "./DialogOverviewExampleDialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  url = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
  displayedColumns: string[] = ['date', 'team', 'score'];
  dataSource = new MatTableDataSource();
  dataTableItems: any = [];
  animal: string;
  name: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageLength = 10;
  size = 10;

  constructor(private http:HttpClient,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.paginator["_pageIndex"] = 0;
    this.paginator["_pageSize"] = 10;
    this.http.get(this.url).subscribe(res => {
      res['rounds'].forEach(dates => {
        dates['matches'].forEach(matches => {
          this.dataTableItems.push(matches);
        });
      });
      this.dataSource = new MatTableDataSource(this.dataTableItems);
      this.dataSource.paginator = this.paginator;
    });
  }

  teamDetails() {

  }

  openDialog(element: any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '600px',
      data: { teamName: element, matches: this.dataTableItems }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
