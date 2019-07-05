﻿using EventsExpress.Db.EF;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace EventsExpress.Db.IRepo
{
    public interface IRepository<T> where T : class
    {                                                         
        T Get(Guid id);
        T Insert(T entity);
        T Update(T entity);
        T Delete(T entity);

        IQueryable<T> Get();        
        
        IQueryable<T> Filter(int? skip = null,
          int? take = null,
          Expression<Func<T, bool>> filter = null,
          Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
          string includeProperties = "");
                           
    }
}
