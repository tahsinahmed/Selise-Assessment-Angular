import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['dialog-overview-example-dialog.css']
})
export class DialogOverviewExampleDialog implements OnInit{

  teamWins: number = 0;
  teamLoss: number = 0;
  teamDraws: number = 0;
  totalMatches: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.data['matches'].forEach(match => {
      if(match.team1.name === this.data['teamName']) {
        if(match.score1 > match.score2) {
          this.teamWins++;
        } else if(match.score2 > match.score1) {
          this.teamLoss++;
        } else {
          this.teamDraws++;
        }
        this.totalMatches++;
      } else if(match.team2.name === this.data['teamName']) {
        if(match.score1 > match.score2) {
          this.teamLoss++;
        } else if(match.score2 > match.score1) {
          this.teamWins++;
        } else {
          this.teamDraws++;
        }
        this.totalMatches++;
      }
    });
  }

}
