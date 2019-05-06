import { Subject } from "rxjs/Subject";
import { CompleterData, CompleterItem } from "ng2-completer";
import { User } from "../models/user";
import { UserService } from "../services/user.service";

// https://github.com/oferh/ng2-completer/blob/master/demo/custom-data.ts

export class CustomCompleterUserData extends Subject<CompleterItem[]> implements CompleterData {
    constructor(private userService: UserService) {
        super();
    }

      getSearchString(user) {
        return user.first_name + ' ' + user.last_name + ' ' + user.username + ' <' + user.email + '>';
      }

      convertToItem(user: User) : CompleterItem | null  {
        if (!user) {
            return null;
        }

        return {
          title: typeof user === "string" ? user : this.getSearchString(user),
          originalObject: user
        } as CompleterItem;
    }

    public search(term: string): void {
        this.userService.list([{name: 'search', 'value': term}], 25).subscribe(
        users => {
          let matches = users.results.map(u => this.convertToItem(u)) as CompleterItem[];
          this.next(matches);
        }
      );
    }

    public cancel() {
        // Handle cancel
    }
}
