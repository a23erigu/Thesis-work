import json
from statistics import mean

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.stats as stats
import statsmodels.stats.api as sm

Title = "Simple combined"        # Decides the title

def extract_newman_times(filename):
    with open(filename, 'r') as f:
        data = json.load(f)

    times_list = [ex["responseTime"] for ex in data]

    return times_list

select_prisma_times = extract_newman_times("reports/Select/report-Prisma_SimpleSelect-10000-16-22-29.json")
create_prisma_times = extract_newman_times("reports/Create/report-Prisma_SimpleCreate-10000-17-07-51.json")
update_prisma_times = extract_newman_times("reports/Update/report-Prisma_SimpleUpdate-10000-17-23-36.json")
delete_prisma_times = extract_newman_times("reports/Delete/report-Prisma_SimpleDelete-10000-17-39-30.json")
all_prisma_times = select_prisma_times + create_prisma_times + update_prisma_times + delete_prisma_times
select_sequelize_times = extract_newman_times("reports/Select/report-Sequelize_SimpleSelect-10000-14-57-10.json")
create_sequelize_times = extract_newman_times("reports/Create/report-Sequelize_SimpleCreate-10000-10-48-59.json")
update_sequelize_times = extract_newman_times("reports/Update/report-Sequelize_SimpleUpdate-10000-11-05-26.json")
delete_sequelize_times = extract_newman_times("reports/Delete/report-Sequelize_SimpleDelete-10000-11-21-24.json")
all_sequelize_times = select_sequelize_times + create_sequelize_times + update_sequelize_times + delete_sequelize_times
select_sql_times = extract_newman_times("reports/Select/report-SQL_SimpleSelect-10000-14-40-09.json")
create_sql_times = extract_newman_times("reports/Create/report-SQL_SimpleCreate-10000-11-55-00.json") 
update_sql_times = extract_newman_times("reports/Update/report-SQL_SimpleUpdate-10000-13-06-21.json")
delete_sql_times = extract_newman_times("reports/Delete/report-SQL_SimpleDelete-10000-13-22-00.json")
all_sql_times = select_sql_times + create_sql_times + update_sql_times + delete_sql_times

engines = ['Prisma', 'Pure-SQL', 'Sequelize']
all_time = [all_prisma_times, all_sql_times, all_sequelize_times]

plt.figure(figsize=(8, 6))
bp = plt.boxplot(all_time, tick_labels=engines, patch_artist=True, medianprops={"color": "#000000"})

colors = ['#41a2d8', '#D87741', '#57d841']

for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)

plt.ylim(bottom=0, top=26)

plt.title(Title)
plt.ylabel('Mean response times(ms)')
plt.xlabel('Query engine')

plt.tight_layout()
plt.show()
