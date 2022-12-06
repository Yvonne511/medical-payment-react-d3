// This file is for payment amount by type

// val recipientstate = lines.map(x => x.split(",")(14))
// val results = recipientstate.countByValue()

val lines = sc.textFile("final/input/OP_DTL_GNRL_PGYR2021_P06302022.csv")
val Head = lines.first()
val cleaneffectivelines = lines.filter(line => !line.equals(Head)).filter(line => line.split(",").length==91).filter(line => line.split(",")(25)!="")
val paymentWithType = cleaneffectivelines.map{x => x.split(',')}.map{x => (x(25).toLowerCase(),x(41).toDouble)}
val paymentGroupByType = paymentWithType.reduceByKey((a, b) => a + b)
paymentGroupByType.take(5)

val dfpaymentGroupByType = spark.createDataFrame(paymentGroupByType)
dfpaymentGroupByType.coalesce(1).write.csv("paymentGroupByType")

//This will filter more general type
val paymentWithGeneralType = cleaneffectivelines.map{x => x.split(',')}.map{x => (x(25).split('|')(0).toLowerCase(),x(41).toDouble)}
val paymentGroupByGeneralType = paymentWithGeneralType.reduceByKey((a, b) => a + b)
paymentGroupByGeneralType.take(5)
val dfpaymentGroupByGeneralType = spark.createDataFrame(paymentGroupByGeneralType)
dfpaymentGroupByGeneralType.coalesce(1).write.csv("paymentGroupByGeneralType")



