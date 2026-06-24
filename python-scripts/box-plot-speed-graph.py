import json
from statistics import mean

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.stats as stats
import statsmodels.stats.api as sm

Title = "Read Respons Time"        # Decides the title

def extract_newman_times(filename):
    with open(filename, 'r') as f:
        data = json.load(f)

    times_list = [ex["responseTime"] for ex in data]

    return times_list

#--------------------#
#  Postgres Results  #
#--------------------#
post_A_prisma_times = extract_newman_times("reports/Select/report-Prisma_AdvancedSelect-10000-16-42-06.json")
post_A_sequelize_times = extract_newman_times("reports/Select/report-Sequelize_AdvancedSelect-10000-15-24-00.json")
post_A_sql_times = extract_newman_times("reports/Select/report-SQL_AdvancedSelect-10000-15-39-57.json")
post_S_prisma_times = extract_newman_times("reports/Select/report-Prisma_SimpleSelect-10000-16-22-29.json")
post_S_sequelize_times = extract_newman_times("reports/Select/report-Sequelize_SimpleSelect-10000-14-57-10.json")
post_S_sql_times = extract_newman_times("reports/Select/report-SQL_SimpleSelect-10000-14-40-09.json")

#-----------------#
#  Maria Results  #
#-----------------#
maria_A_prisma_times = extract_newman_times("reports/Select/report-Prisma_AdvancedSelect-10000-16-42-06.json")
maria_A_sequelize_times = extract_newman_times("reports/Select/report-Sequelize_AdvancedSelect-10000-15-24-00.json")
maria_A_sql_times = extract_newman_times("reports/Select/report-SQL_AdvancedSelect-10000-15-39-57.json")
maria_S_prisma_times = extract_newman_times("reports/Select/report-Prisma_SimpleSelect-10000-16-22-29.json")
maria_S_sequelize_times = extract_newman_times("reports/Select/report-Sequelize_SimpleSelect-10000-14-57-10.json")
maria_S_sql_times = extract_newman_times("reports/Select/report-SQL_SimpleSelect-10000-14-40-09.json")

engines = ['Prisma', 'Pure-SQL', 'Sequelize']

post_A_all_time = [post_A_prisma_times, post_A_sql_times, post_A_sequelize_times]
post_S_all_time = [post_S_prisma_times, post_S_sql_times, post_S_sequelize_times]

maria_A_all_time = [maria_A_prisma_times, maria_A_sql_times, maria_A_sequelize_times]
maria_S_all_time = [maria_S_prisma_times, maria_S_sql_times, maria_S_sequelize_times]

colors = ['#41a2d8', '#D87741', '#57d841']

fig, axs = plt.subplots(2, 2, sharey=True)
plt.ylim(bottom=0, top=30)

#---------------------#
#  Postgres Advanced  #
#---------------------#
axs[0, 0].boxplot(post_A_all_time, tick_labels=engines, patch_artist=True, medianprops={"color": "#000000"})
axs[0, 0].set_title('PostgreSQL Advanced')

#-------------------#
#  Postgres Simple  #
#-------------------#
axs[0, 1].boxplot(post_S_all_time, tick_labels=engines, patch_artist=True, medianprops={"color": "#000000"})
axs[0, 1].set_title('PostgreSQL Simple')

#------------------#
#  Maria Advanced  #
#------------------#
axs[1, 0].boxplot(maria_A_all_time, tick_labels=engines, patch_artist=True, medianprops={"color": "#000000"})
axs[1, 0].set_title('MariaDB Advanced')

#----------------#
#  Maria Simple  #
#----------------#
axs[1, 1].boxplot(maria_S_all_time, tick_labels=engines, patch_artist=True, medianprops={"color": "#000000"})
axs[1, 1].set_title('MariaDB Simple')

for ax in axs.flat:
    ax.label_outer()

plt.suptitle(Title)

fig.supylabel('Mean response times(ms)')
fig.supxlabel('Engines')

plt.tight_layout()
plt.show()

