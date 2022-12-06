df.printSchema()

// Payment by state
var df = spark.read.option("header",true).csv("final/input/OP_DTL_GNRL_PGYR2021_P06302022.csv")
df.printSchema()
df = df.select(df.col("Recipient_State"),df.col("Total_Amount_of_Payment_USDollars"))
df = df.na.drop()
df = df.groupBy($"Recipient_State").agg(sum($"Total_Amount_of_Payment_USDollars").alias("Total_Amount_of_Payment_USDollars"))
df.coalesce(1).write.csv("paymentGroupByState")

// Payment by Speciality
var df = spark.read.option("header",true).csv("final/input/OP_DTL_GNRL_PGYR2021_P06302022.csv")
df = df.select(df.col("Covered_Recipient_Specialty_1"),df.col("Total_Amount_of_Payment_USDollars"))
df = df.na.drop()
df = df.groupBy($"Covered_Recipient_Specialty_1").agg(sum($"Total_Amount_of_Payment_USDollars").alias("Total_Amount_of_Payment_USDollars"))
df.coalesce(1).write.csv("paymentGroupBySpeciality")

// Payment by General Speciality
var df = spark.read.option("header",true).csv("final/input/OP_DTL_GNRL_PGYR2021_P06302022.csv")
df = df.select(df.col("Covered_Recipient_Specialty_1"),df.col("Total_Amount_of_Payment_USDollars"))
df = df.na.drop()
df = df.withColumn("Covered_Recipient_Specialty_1",split(col("Covered_Recipient_Specialty_1"),"\\|")(0))
df = df.groupBy($"Covered_Recipient_Specialty_1").agg(sum($"Total_Amount_of_Payment_USDollars").alias("Total_Amount_of_Payment_USDollars"))
df.coalesce(1).write.csv("paymentGroupByGeneralSpeciality")

// Payment by Manufacture (Applicable_Manufacturer_or_Applicable_GPO_Making_Payment_Name)
df = df.select(df.col("Applicable_Manufacturer_or_Applicable_GPO_Making_Payment_Name"),df.col("Recipient_State"),df.col("Total_Amount_of_Payment_USDollars"))
df = df.na.drop()
val df_manufacture = df.groupBy($"Applicable_Manufacturer_or_Applicable_GPO_Making_Payment_Name").agg(sum($"Total_Amount_of_Payment_USDollars").alias("Total_Amount_of_Payment_USDollars"))
df_manufacture.coalesce(1).write.csv("paymentGroupByManufacture")
df_manufacture.sort(col("Total_Amount_of_Payment_USDollars").desc).show(false)

// Payment by Manufacture and State (Applicable_Manufacturer_or_Applicable_GPO_Making_Payment_Name)
val df_manufacture_state = df.groupBy($"Applicable_Manufacturer_or_Applicable_GPO_Making_Payment_Name", $"Recipient_State").agg(sum($"Total_Amount_of_Payment_USDollars").alias("Total_Amount_of_Payment_USDollars"))
df_manufacture_state.coalesce(1).write.csv("paymentGroupByManufactureState")

// By Manufacture State and Manufacture
df = df.select(df.col("Applicable_Manufacturer_or_Applicable_GPO_Making_Payment_Name"),df.col("Applicable_Manufacturer_or_Applicable_GPO_Making_Payment_State"),df.col("Total_Amount_of_Payment_USDollars"))
var df_manufacturer_state = df.groupBy($"Applicable_Manufacturer_or_Applicable_GPO_Making_Payment_Name", $"Applicable_Manufacturer_or_Applicable_GPO_Making_Payment_State").agg(sum($"Total_Amount_of_Payment_USDollars").alias("Total_Amount_of_Payment_USDollars"))
df_manufacturer_state.coalesce(1).write.csv("paymentGroupByManufacturerState")

df = df.groupBy($"Applicable_Manufacturer_or_Applicable_GPO_Making_Payment_State").agg(sum($"Total_Amount_of_Payment_USDollars").alias("Total_Amount_of_Payment_USDollars"))
df.coalesce(1).write.csv("paymentGroupByProducersState")