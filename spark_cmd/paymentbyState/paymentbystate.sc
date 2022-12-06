// This file is for payment amount by state

// val recipientstate = lines.map(x => x.split(",")(14))
// val results = recipientstate.countByValue()

val lines = sc.textFile("final/input/OP_DTL_GNRL_PGYR2021_P06302022.csv")
val Head = lines.first()
val cleaneffectivelines = lines.filter(line => !line.equals(Head)).filter(line => line.split(",").length==91).filter(line => line.split(",")(14)!="")
val paymentWithState = cleaneffectivelines.map{x => x.split(',')}.map{x => (x(14).toLowerCase(),x(41).toDouble)}
val paymentGroupByState = paymentWithState.reduceByKey((a, b) => a + b)
paymentGroupByState.take(5)

//paymentGroupByState.foreach(println)

//.takeOrdered(1)(Ordering[Double].reverse.on(_._1))

val dfpaymentGroupByState = spark.createDataFrame(paymentGroupByState)
dfpaymentGroupByState.coalesce(1).write.csv("paymentGroupByState")

