// This file is for payment amount by state and type

// val recipientstate = lines.map(x => x.split(",")(14))
// val results = recipientstate.countByValue()

// val lines = sc.textFile("final/input/OP_DTL_GNRL_PGYR2021_P06302022.csv")
// val Head = lines.first()
// val cleaneffectivelines = lines.filter(line => !line.equals(Head)).filter(line => line.split(",").length==91).filter(line => line.split(",")(14)!="")
// val paymentWithState = cleaneffectivelines.map{x => x.split(',')}.map{x => (x(14).toLowerCase(),x(41).toDouble)}
// val paymentGroupByState = paymentWithState.reduceByKey((a, b) => a + b)
// paymentGroupByState.take(5)

//paymentGroupByState.foreach(println)

//.takeOrdered(1)(Ordering[Double].reverse.on(_._1))

var df = spark.read.option("header",true).csv("final/input/OP_DTL_GNRL_PGYR2021_P06302022.csv")
df.printSchema()

df = df.select(df.col("Recipient_State"),df.col("Covered_Recipient_Specialty_1"),df.col("Total_Amount_of_Payment_USDollars"))
df = df.withColumn("Covered_Recipient_Specialty_1",split(col("Covered_Recipient_Specialty_1"),"\\|")(0))
df = df.na.drop()
df.printSchema()
df.show(false)

df = df.groupBy($"Recipient_State", $"Covered_Recipient_Specialty_1").agg(sum($"Total_Amount_of_Payment_USDollars").alias("Total_Amount_of_Payment_USDollars"))

df.coalesce(1).write.csv("paymentGroupByStateType")

