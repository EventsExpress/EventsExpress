﻿using System;
using EventsExpress.ViewModels;
using FluentValidation;

namespace EventsExpress.Validation
{
    public class EventStatusHistoryViewModelValidation : AbstractValidator<EventStatusHistoryViewModel>
    {
        public EventStatusHistoryViewModelValidation()
        {
            RuleFor(e => e.EventId).NotEqual(Guid.Empty).WithMessage("EventId can`t be empty");
            RuleFor(e => e.Reason).NotEmpty().WithMessage("Reason is required")
                                  .Must(r => r.Length > 5 && r.Length < 500)
                                  .WithMessage("Reason should be between 5 and 500 characters");
        }
    }
}
