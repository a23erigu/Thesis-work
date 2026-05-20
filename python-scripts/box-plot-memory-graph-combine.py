import json
from statistics import mean

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.stats as stats
import statsmodels.stats.api as sm

Title = "Simple combined"        # Decides the title

def extract_newman_memory_use(filename):
    with open(filename, 'r') as f:
        data = json.load(f)

    memory_use_list = [ex["memoryUse"] for ex in data]

    return memory_use_list

select_prisma_memory_use = extract_newman_memory_use("reports/Select/report-Prisma_SimpleSelect-10000-16-22-29.json")
create_prisma_memory_use = extract_newman_memory_use("reports/Create/report-Prisma_SimpleCreate-10000-17-07-51.json")
update_prisma_memory_use = extract_newman_memory_use("reports/Update/report-Prisma_SimpleUpdate-10000-17-23-36.json")
delete_prisma_memory_use = extract_newman_memory_use("reports/Delete/report-Prisma_SimpleDelete-10000-17-39-30.json")
all_prisma_memory_use = select_prisma_memory_use + create_prisma_memory_use + update_prisma_memory_use + delete_prisma_memory_use
select_sequelize_memory_use = extract_newman_memory_use("reports/Select/report-Sequelize_SimpleSelect-10000-14-57-10.json")
create_sequelize_memory_use = extract_newman_memory_use("reports/Create/report-Sequelize_SimpleCreate-10000-10-48-59.json")
update_sequelize_memory_use = extract_newman_memory_use("reports/Update/report-Sequelize_SimpleUpdate-10000-11-05-26.json")
delete_sequelize_memory_use = extract_newman_memory_use("reports/Delete/report-Sequelize_SimpleDelete-10000-11-21-24.json")
all_sequelize_memory_use = select_sequelize_memory_use + create_sequelize_memory_use + update_sequelize_memory_use + delete_sequelize_memory_use
select_sql_memory_use = extract_newman_memory_use("reports/Select/report-SQL_SimpleSelect-10000-14-40-09.json")
create_sql_memory_use = extract_newman_memory_use("reports/Create/report-SQL_SimpleCreate-10000-11-55-00.json")
update_sql_memory_use = extract_newman_memory_use("reports/Update/report-SQL_SimpleUpdate-10000-13-06-21.json")
delete_sql_memory_use = extract_newman_memory_use("reports/Delete/report-SQL_SimpleDelete-10000-13-22-00.json")
all_sql_memory_use = select_sql_memory_use + create_sql_memory_use + update_sql_memory_use + delete_sql_memory_use

engines = ['Prisma', 'Pure-SQL', 'Sequelize']
all_memory = [all_prisma_memory_use, all_sql_memory_use, all_sequelize_memory_use]

plt.figure(figsize=(8, 6))
bp = plt.boxplot(all_memory, tick_labels=engines, patch_artist=True, medianprops={'color': '#000000'})

colors = ['#41a2d8', '#D87741', '#57d841']

for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)

plt.ylim(bottom=22, top=36)

plt.title(Title)
plt.ylabel('Mean memory use (MB)')
plt.xlabel('Query engine')

plt.tight_layout()
plt.show()
