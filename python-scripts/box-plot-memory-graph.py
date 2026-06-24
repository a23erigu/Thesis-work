import json
from statistics import mean

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.stats as stats
import statsmodels.stats.api as sm

Title = "Read Memory Use"        # Decides the title

def extract_newman_memory_use(filename):
    with open(filename, 'r') as f:
        data = json.load(f)

    memory_use_list = [ex["memoryUse"] for ex in data]

    return memory_use_list

#--------------------#
#  Postgres Results  #
#--------------------#
post_A_prisma_memory_use = extract_newman_memory_use("reports/Select/report-Prisma_AdvancedSelect-10000-16-42-06.json")
post_A_sequelize_memory_use = extract_newman_memory_use("reports/Select/report-Sequelize_AdvancedSelect-10000-15-24-00.json")
post_A_sql_memory_use = extract_newman_memory_use("reports/Select/report-SQL_AdvancedSelect-10000-15-39-57.json")
post_S_prisma_memory_use = extract_newman_memory_use("reports/Select/report-Prisma_SimpleSelect-10000-16-22-29.json")
post_S_sequelize_memory_use = extract_newman_memory_use("reports/Select/report-Sequelize_SimpleSelect-10000-14-57-10.json")
post_S_sql_memory_use = extract_newman_memory_use("reports/Select/report-SQL_SimpleSelect-10000-14-40-09.json")

#-----------------#
#  Maria Results  #
#-----------------#
maria_A_prisma_memory_use = extract_newman_memory_use("reports/Select/report-Prisma_AdvancedSelect-10000-16-42-06.json")
maria_A_sequelize_memory_use = extract_newman_memory_use("reports/Select/report-Sequelize_AdvancedSelect-10000-15-24-00.json")
maria_A_sql_memory_use = extract_newman_memory_use("reports/Select/report-SQL_AdvancedSelect-10000-15-39-57.json")
maria_S_prisma_memory_use = extract_newman_memory_use("reports/Select/report-Prisma_SimpleSelect-10000-16-22-29.json")
maria_S_sequelize_memory_use = extract_newman_memory_use("reports/Select/report-Sequelize_SimpleSelect-10000-14-57-10.json")
maria_S_sql_memory_use = extract_newman_memory_use("reports/Select/report-SQL_SimpleSelect-10000-14-40-09.json")

engines = ['Prisma', 'Pure-SQL', 'Sequelize']

post_A_all_memory = [post_A_prisma_memory_use, post_A_sql_memory_use, post_A_sequelize_memory_use]
post_S_all_memory = [post_S_prisma_memory_use, post_S_sql_memory_use, post_S_sequelize_memory_use]

maria_A_all_memory = [maria_A_prisma_memory_use, maria_A_sql_memory_use, maria_A_sequelize_memory_use]
maria_S_all_memory = [maria_S_prisma_memory_use, maria_S_sql_memory_use, maria_S_sequelize_memory_use]

colors = ['#41a2d8', '#D87741', '#57d841']

fig, axs = plt.subplots(2, 2, sharey=True)
plt.ylim(bottom=22, top=36)

#---------------------#
#  Postgres Advanced  #
#---------------------#
axs[0, 0].boxplot(post_A_all_memory, tick_labels=engines, patch_artist=True, medianprops={"color": "#000000"})
axs[0, 0].set_title('PostgreSQL Advanced')

#-------------------#
#  Postgres Simple  #
#-------------------#
axs[0, 1].boxplot(post_S_all_memory, tick_labels=engines, patch_artist=True, medianprops={"color": "#000000"})
axs[0, 1].set_title('PostgreSQL Simple')

#------------------#
#  Maria Advanced  #
#------------------#
axs[1, 0].boxplot(maria_A_all_memory, tick_labels=engines, patch_artist=True, medianprops={"color": "#000000"})
axs[1, 0].set_title('MariaDB Advanced')

#----------------#
#  Maria Simple  #
#----------------#
axs[1, 1].boxplot(maria_S_all_memory, tick_labels=engines, patch_artist=True, medianprops={"color": "#000000"})
axs[1, 1].set_title('MariaDB Simple')

for ax in axs.flat:
    ax.label_outer()

plt.suptitle(Title)

fig.supylabel('Mean memory use (MB)')
fig.supxlabel('Query engine')

plt.tight_layout()
plt.show()
