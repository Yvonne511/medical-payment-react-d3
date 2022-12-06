val lines = sc.textFile("final/input/OP_DTL_GNRL_PGYR2021_P06302022.csv")
val linescount = lines.count()

val Head = lines.first()
Head.split(",").length

val lines = sc.textFile("final/input/OP_DTL_GNRL_PGYR2021_P06302022.csv")
val cleanlines = lines.filter(line => line.split(",").length==91).count()

val lines = sc.textFile("final/input/OP_DTL_GNRL_PGYR2021_P06302022.csv")
val Head = lines.first()
val cleaneffectivelines = lines.filter(line => !line.equals(Head)).filter(line => line.split(",").length==91).filter(line => line.split(",")(14)!="")
cleaneffectivelines.count()
