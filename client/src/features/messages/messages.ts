import { Component, inject, OnInit, signal } from '@angular/core';
import { MessageService } from '../../core/services/message-service';
import { Message } from '../../types/message';
import { PaginatedResult } from '../../types/pagination';
import { Paginator } from "../../shared/paginator/paginator";
import { RouterLink } from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-messages',
  imports: [Paginator, RouterLink, DatePipe],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages implements OnInit {
  
  private messageservice = inject(MessageService);
  protected container = 'Inbox';
  protected fetchContainer = 'Inbox'
  protected pageNumber = 1;
  protected pageSize = 10;
  protected paginatedMessages = signal<PaginatedResult<Message> | null>(null);

  tabs=[
    {label : 'Inbox', value:'Inbox'},
    {label : 'Outbox', value:'Outbox'}

  ]
  

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(){
    this.messageservice.getMessages(this.container, this.pageNumber, this.pageSize)
      .subscribe({
        next: response => {
          this.paginatedMessages.set(response);
          this.fetchContainer = this.container;
        }
      })
  }

  deleteMessage(event: Event, id :string){
    event.stopPropagation();
    this.messageservice.deleteMessage(id).subscribe({
      next: () => {
        const current= this.paginatedMessages();
        if(current?.items){
          this.paginatedMessages.update(prev => {
            if(!prev) return null;

            const newItems = prev.items.filter(x => x.id !== id) || [];

            return{
              items:newItems,
              metadata:prev.metadata
            }
          })
        }
      }
    })

  }

  get isInbox(){
    return this.fetchContainer === 'Inbox';
  }

  setContainer(container: string){
    this.container = container;
    this.pageNumber = 1;
    this.loadMessages();
  }

  onPageChange(event:{pageNumber:number, pageSize:number}){
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageNumber;
    this.loadMessages();
  }

}
