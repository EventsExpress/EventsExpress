﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventsExpress.DTO
{
    public class CommentDto
    {
        public Guid Id { get; set; }

        public string Text { get; set; }

        public Guid UserId { get; set; }

        public Guid EventId { get; set; }

        public DateTime Date { get; set; }
    }
}
