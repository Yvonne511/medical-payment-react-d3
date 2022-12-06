// This file is for payment amount by drug name
var df = spark.read.option("header",true).csv("final/input/OP_DTL_GNRL_PGYR2021_P06302022.csv")
df.printSchema()

df = df.select(df.col("Name_of_Drug_or_Biological_or_Device_or_Medical_Supply_1"),df.col("Total_Amount_of_Payment_USDollars"))
df = df.na.drop()
df.printSchema()
df.show(false)

df = df.groupBy($"Name_of_Drug_or_Biological_or_Device_or_Medical_Supply_1").agg(sum($"Total_Amount_of_Payment_USDollars").alias("Total_Amount_of_Payment_USDollars"))

df.coalesce(1).write.csv("paymentGroupByDrugName")



// This file is for payment amount by drug name and state
var df = spark.read.option("header",true).csv("final/input/OP_DTL_GNRL_PGYR2021_P06302022.csv")
df.printSchema()

df = df.select(df.col("Recipient_State"),df.col("Name_of_Drug_or_Biological_or_Device_or_Medical_Supply_1"),df.col("Total_Amount_of_Payment_USDollars"))
df = df.na.drop()
df.printSchema()
df.show(false)

df = df.groupBy($"Recipient_State", $"Name_of_Drug_or_Biological_or_Device_or_Medical_Supply_1").agg(sum($"Total_Amount_of_Payment_USDollars").alias("Total_Amount_of_Payment_USDollars"))

df.coalesce(1).write.csv("paymentGroupByDrugNameState")

